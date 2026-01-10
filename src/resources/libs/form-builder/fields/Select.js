import React, { useState, useRef, useEffect, useCallback } from "react";
import { __ } from "@wordpress/i18n";
import { ChevronDown, X, Search, Loader } from "lucide-react";
import FieldBase from "../utils/FieldBase";
import { filterInternalProps } from "../utils/filterInternalProps";
import { buildUrl } from "../../url";

/**
 * Unified Select Field - Single/Multi select with static/API data sources
 *
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} props.name - Field name
 * @param {Array} props.rules - Validation rules
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.inline - Inline layout
 * @param {string} props.help - Help text
 * @param {string} props.className - Additional CSS class
 * @param {boolean} props.multiple - Enable multi-select mode (tag-like)
 * @param {boolean} props.searchable - Enable search/filter functionality
 * @param {Array|Object} props.data - Static data options (flat or grouped)
 * @param {Object} props.api - API configuration for dynamic data
 * @param {string} props.api.endpoint - Base API endpoint URL (required for API mode)
 * @param {string} props.api.dataType - 'posttype' or 'taxonomy' (required)
 * @param {string} props.api.source - Post type slug or taxonomy name (required)
 * @param {string} props.api.orderBy - 'title' or 'date'
 * @param {string} props.api.order - 'asc' or 'desc'
 * @param {string} props.api.groupBy - 'date' or taxonomy slug (for posttype)
 * @param {Object} props.api.meta - Meta query filters { key: value }
 * @param {string} props.api.taxonomy - Filter by taxonomy (for posttype)
 * @param {string|number} props.api.taxonomyTerm - Term ID or slug
 * @param {string} props.api.nonce - Optional nonce for additional verification
 */
const SelectField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  help,
  className = "",
  multiple = false,
  searchable = true,
  data = [],
  api = null,
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const cleanProps = filterInternalProps(props);

  const defaultPlaceholder =
    placeholder ||
    __(`Select ${label?.toLowerCase() || "option"}`, "arraysubscription");

  // Check if data is grouped (2D structure)
  const isGrouped = useCallback((items) => {
    if (!Array.isArray(items) || items.length === 0) return false;
    return items.some((item) => item.options && Array.isArray(item.options));
  }, []);

  // Normalize data structure
  const normalizeData = useCallback((rawData) => {
    if (!rawData) return [];

    // Handle array format
    if (Array.isArray(rawData)) {
      return rawData;
    }

    // Handle object format { value: label }
    if (typeof rawData === "object") {
      return Object.entries(rawData).map(([value, label]) => ({
        value,
        label,
      }));
    }

    return [];
  }, []);

  // Stringify api config to use as stable dependency
  const apiConfigKey = api ? JSON.stringify(api) : null;

  // Fetch data from API
  const fetchApiData = useCallback(
    async (search = "") => {
      if (!api || !api.endpoint || !api.dataType || !api.source) return;

      setLoading(true);
      setError(null);

      try {
        const params = {
          dataType: api.dataType,
          source: api.source,
        };

        if (search) params.search = search;
        if (api.orderBy) params.orderBy = api.orderBy;
        if (api.order) params.order = api.order;
        if (api.groupBy) params.groupBy = api.groupBy;
        if (api.taxonomy) params.taxonomy = api.taxonomy;
        if (api.taxonomyTerm) params.taxonomyTerm = api.taxonomyTerm;
        if (api.meta) params.meta = JSON.stringify(api.meta);
        if (api.nonce) params.nonce = api.nonce;

        const url = buildUrl(api.endpoint, params);

        const response = await fetch(url, {
          headers: {
            "X-WP-Nonce": window?.arraySubscription?.env?.nonce,
          },
        });

        if (!response.ok) {
          throw new Error(__("Failed to fetch options", "arraysubscription"));
        }

        const result = await response.json();
        setOptions(normalizeData(result.content || result));
      } catch (err) {
        setError(err.message);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiConfigKey]
  );

  // Initialize options - only run once when api config changes
  useEffect(() => {
    if (api && api.endpoint) {
      fetchApiData();
    } else {
      setOptions(normalizeData(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiConfigKey]);

  // Update static options when data prop changes
  useEffect(() => {
    if (!api) {
      setOptions(normalizeData(data));
    }
  }, [data, api, normalizeData]);

  // Debounced API search
  useEffect(() => {
    if (!api || !api.endpoint || !searchQuery) return;

    const timer = setTimeout(() => {
      fetchApiData(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, apiConfigKey]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Filter options based on search query (for static data)
  const getFilteredOptions = useCallback(() => {
    if (!searchQuery || api) return options;

    const query = searchQuery.toLowerCase();

    if (isGrouped(options)) {
      return options
        .map((group) => ({
          ...group,
          options: group.options.filter((opt) =>
            opt.label.toLowerCase().includes(query)
          ),
        }))
        .filter((group) => group.options.length > 0);
    }

    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, searchQuery, api, isGrouped]);

  // Get label for a value
  const getLabel = useCallback(
    (val) => {
      const flatOptions = isGrouped(options)
        ? options.flatMap((g) => g.options)
        : options;
      const item = flatOptions.find((d) => d.value === val);
      return item ? item.label : val;
    },
    [options, isGrouped]
  );

  // Render option item
  const renderOption = (item, isSelected, onClick) => (
    <div
      key={item.value}
      className={`arraysubscription-fb-select-option ${
        isSelected ? "arraysubscription-fb-select-option--selected" : ""
      } ${item.disabled ? "arraysubscription-fb-select-option--disabled" : ""}`}
      onClick={() => !item.disabled && onClick(item.value)}
    >
      {multiple && (
        <span className="arraysubscription-fb-select-option-checkbox">
          <input type="checkbox" checked={isSelected} readOnly tabIndex={-1} />
        </span>
      )}
      <span className="arraysubscription-fb-select-option-label">
        {item.label}
      </span>
    </div>
  );

  // Render options list (flat or grouped)
  const renderOptions = (filteredOptions, currentValue, handleSelect) => {
    if (filteredOptions.length === 0) {
      return (
        <div className="arraysubscription-fb-select-no-options">
          {__("No options available", "arraysubscription")}
        </div>
      );
    }

    if (isGrouped(filteredOptions)) {
      return filteredOptions.map((group) => (
        <div key={group.label} className="arraysubscription-fb-select-group">
          <div className="arraysubscription-fb-select-group-label">
            {group.label}
          </div>
          <div className="arraysubscription-fb-select-group-options">
            {group.options.map((item) =>
              renderOption(
                item,
                multiple
                  ? currentValue.includes(item.value)
                  : currentValue === item.value,
                handleSelect
              )
            )}
          </div>
        </div>
      ));
    }

    return filteredOptions.map((item) =>
      renderOption(
        item,
        multiple
          ? currentValue.includes(item.value)
          : currentValue === item.value,
        handleSelect
      )
    );
  };

  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
      className={className}
    >
      {(control) => {
        const currentValue = multiple
          ? control.value || []
          : control.value ?? "";

        const handleSelect = (optionValue) => {
          if (multiple) {
            const newValue = currentValue.includes(optionValue)
              ? currentValue.filter((v) => v !== optionValue)
              : [...currentValue, optionValue];
            control.onChange(newValue);
          } else {
            control.onChange(optionValue);
            setIsOpen(false);
            setSearchQuery("");
          }
        };

        const handleRemove = (optionValue, e) => {
          e.stopPropagation();
          if (multiple) {
            control.onChange(currentValue.filter((v) => v !== optionValue));
          } else {
            control.onChange("");
          }
        };

        const handleClear = (e) => {
          e.stopPropagation();
          control.onChange(multiple ? [] : "");
        };

        const filteredOptions = getFilteredOptions();
        const hasValue = multiple ? currentValue.length > 0 : !!currentValue;

        return (
          <div
            className={`arraysubscription-fb-select ${
              multiple ? "arraysubscription-fb-select--multiple" : ""
            } ${
              disabled ? "arraysubscription-fb-select--disabled" : ""
            } ${className}`}
            ref={containerRef}
            {...cleanProps}
          >
            <div
              className={`arraysubscription-fb-select-control ${
                isOpen ? "arraysubscription-fb-select-control--open" : ""
              }`}
              onClick={() => !disabled && setIsOpen(!isOpen)}
            >
              <div className="arraysubscription-fb-select-value">
                {!hasValue ? (
                  <span className="arraysubscription-fb-select-placeholder">
                    {defaultPlaceholder}
                  </span>
                ) : multiple ? (
                  <div className="arraysubscription-fb-select-tags">
                    {currentValue.map((val) => (
                      <span
                        key={val}
                        className="arraysubscription-fb-select-tag"
                      >
                        <span className="arraysubscription-fb-select-tag-label">
                          {getLabel(val)}
                        </span>
                        <span
                          className="arraysubscription-fb-select-tag-remove"
                          onClick={(e) => handleRemove(val, e)}
                        >
                          <X size={12} />
                        </span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="arraysubscription-fb-select-single-value">
                    {getLabel(currentValue)}
                  </span>
                )}
              </div>
              <div className="arraysubscription-fb-select-indicators">
                {hasValue && !disabled && (
                  <span
                    className="arraysubscription-fb-select-clear"
                    onClick={handleClear}
                  >
                    <X size={14} />
                  </span>
                )}
                <ChevronDown
                  size={16}
                  className={`arraysubscription-fb-select-chevron ${
                    isOpen ? "arraysubscription-fb-select-chevron--open" : ""
                  }`}
                />
              </div>
            </div>

            {isOpen && (
              <div className="arraysubscription-fb-select-dropdown">
                {searchable && (
                  <div className="arraysubscription-fb-select-search">
                    <Search
                      size={14}
                      className="arraysubscription-fb-select-search-icon"
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="arraysubscription-fb-select-search-input"
                      placeholder={__("Search...", "arraysubscription")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
                <div className="arraysubscription-fb-select-options">
                  {loading ? (
                    <div className="arraysubscription-fb-select-loading">
                      <Loader
                        size={16}
                        className="arraysubscription-fb-select-spinner"
                      />
                      <span>{__("Loading...", "arraysubscription")}</span>
                    </div>
                  ) : error ? (
                    <div className="arraysubscription-fb-select-error">
                      {error}
                    </div>
                  ) : (
                    renderOptions(filteredOptions, currentValue, handleSelect)
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }}
    </FieldBase>
  );
};

export default SelectField;
