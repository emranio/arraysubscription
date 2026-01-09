import React, { useState, useContext, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldBase from "../utils/FieldBase";
import { NamePrefixContext } from "../utils/NamePrefixContext";

// A separate component for the sortable item
const SortableItem = ({
  id,
  index,
  isOpen,
  onToggle,
  onRemove,
  itemTitle,
  children,
  showDeleteButton,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="arraysubscription-fb-repeater-item"
    >
      <div
        className={`arraysubscription-fb-repeater-item-header ${
          isOpen ? "arraysubscription-fb-repeater-item-open" : ""
        }`}
        onClick={onToggle}
      >
        <div className="arraysubscription-fb-repeater-item-title">
          <span
            className="arraysubscription-fb-repeater-drag-handle"
            {...attributes}
            {...listeners}
          >
            ☰
          </span>
          <span>{itemTitle}</span>
        </div>

        {showDeleteButton && (
          <button
            type="button"
            className="arraysubscription-fb-button arraysubscription-fb-button-icon arraysubscription-fb-button-danger"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            aria-label="Remove item"
          >
            ×
          </button>
        )}
      </div>

      <div
        className={`arraysubscription-fb-repeater-item-content ${
          isOpen ? "arraysubscription-fb-repeater-item-open" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

// A new component to render the repeater content, so we can use hooks
const RepeaterContent = ({
  control,
  form,
  namePrefix,
  name,
  items,
  collapsible,
  showDeleteButton,
  itemTitleTemplate,
  showFirstInputInTitle,
  renderFormItems,
  addButtonText,
}) => {
  const [openItems, setOpenItems] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentItems = useMemo(() => control.value || [], [control.value]);

  // Get item title based on first input value
  const getItemTitle = (index, currentItems) => {
    if (!showFirstInputInTitle || !items.length) {
      return itemTitleTemplate.replace("{index}", index + 1);
    }

    try {
      const firstField = items[0];
      if (firstField && firstField.name && currentItems[index]) {
        const firstValue = currentItems[index][firstField.name];
        if (firstValue && String(firstValue).trim()) {
          return `${itemTitleTemplate.replace("{index}", index + 1)} - ${String(
            firstValue
          ).trim()}`;
        }
      }
    } catch (error) {
      console.warn("Error getting item title:", error);
    }

    return itemTitleTemplate.replace("{index}", index + 1);
  };

  // Render nested form items for each repeater item
  const renderItemChildren = (itemIndex) => {
    if (!items || !items.length) {
      return (
        <div style={{ padding: "12px", color: "#666" }}>
          No items configured
        </div>
      );
    }

    if (!renderFormItems) {
      return (
        <div style={{ padding: "12px", color: "#666" }}>
          No renderFormItems function
        </div>
      );
    }

    const currentName = Array.isArray(name) ? name : [name].filter(Boolean);
    const newNamePrefix = [...namePrefix, ...currentName, itemIndex];

    return (
      <NamePrefixContext.Provider value={newNamePrefix}>
        {renderFormItems(items)}
      </NamePrefixContext.Provider>
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = currentItems.findIndex((item) => item.id === active.id);
      const newIndex = currentItems.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(currentItems, oldIndex, newIndex);
      control.onChange(newItems);

      // Update open items indices
      const newOpenItems = openItems.map((openIndex) => {
        if (openIndex === oldIndex) return newIndex;
        if (openIndex >= newIndex && openIndex < oldIndex) return openIndex + 1;
        if (openIndex <= newIndex && openIndex > oldIndex) return openIndex - 1;
        return openIndex;
      });
      setOpenItems(newOpenItems);
    }
  };

  const addItem = () => {
    // Ensure each new item has a unique ID for dnd-kit
    const newItem = { id: `item-${Date.now()}-${Math.random()}` };
    const newItems = [...currentItems, newItem];
    control.onChange(newItems);

    // Auto-expand the newly added item
    if (collapsible) {
      setOpenItems((prev) => [...prev, newItems.length - 1]);
    }
  };

  const removeItem = (index) => {
    const newItems = currentItems.filter((_, i) => i !== index);
    control.onChange(newItems);

    // Update open items indices
    setOpenItems((prev) =>
      prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
    );
  };

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const itemIds = useMemo(
    () => currentItems.map((item) => item.id || ""),
    [currentItems]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div className="arraysubscription-fb-repeater">
          <div className="arraysubscription-fb-repeater-items">
            {currentItems.length > 0
              ? currentItems.map((item, index) => {
                  const isOpen = openItems.includes(index);
                  const itemTitle = getItemTitle(index, currentItems);
                  const itemId = item.id || `item-${index}`; // Fallback id

                  if (collapsible) {
                    return (
                      <SortableItem
                        key={itemId}
                        id={itemId}
                        index={index}
                        itemTitle={itemTitle}
                        isOpen={isOpen}
                        onToggle={() => toggleItem(index)}
                        onRemove={() => removeItem(index)}
                        showDeleteButton={showDeleteButton}
                      >
                        {renderItemChildren(index)}
                      </SortableItem>
                    );
                  }

                  // Non-collapsible version
                  return (
                    <div
                      key={index}
                      className="arraysubscription-fb-repeater-item"
                    >
                      <div className="arraysubscription-fb-repeater-item-header arraysubscription-fb-repeater-item-open">
                        <div className="arraysubscription-fb-repeater-item-title">
                          <span className="arraysubscription-fb-repeater-drag-handle">
                            ☰
                          </span>
                          <span>{itemTitle}</span>
                        </div>

                        {showDeleteButton && (
                          <button
                            type="button"
                            className="arraysubscription-fb-button arraysubscription-fb-button-icon arraysubscription-fb-button-danger"
                            onClick={() => removeItem(index)}
                            aria-label="Remove item"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      <div className="arraysubscription-fb-repeater-item-content arraysubscription-fb-repeater-item-open">
                        {renderItemChildren(index)}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <button
            type="button"
            className="arraysubscription-fb-button arraysubscription-fb-button-primary arraysubscription-fb-repeater-add-button"
            onClick={addItem}
          >
            + {addButtonText}
          </button>
        </div>
      </SortableContext>
    </DndContext>
  );
};

// Simple repeater component with collapsible items
const Repeater = ({
  label,
  name = "items",
  rules = [],
  inline = false,
  items = [],
  addButtonText = "Add Item",
  itemTitleTemplate = "Item {index}",
  showDeleteButton = true,
  showFirstInputInTitle = true,
  collapsible = true,
  renderFormItems, // Function to render nested form items
  ...rest
}) => {
  const namePrefix = useContext(NamePrefixContext);

  return (
    <FieldBase label={label} name={name} rules={rules} inline={inline}>
      {(control, meta, form) => (
        <RepeaterContent
          control={control}
          form={form}
          namePrefix={namePrefix}
          name={name}
          items={items}
          collapsible={collapsible}
          showDeleteButton={showDeleteButton}
          itemTitleTemplate={itemTitleTemplate}
          showFirstInputInTitle={showFirstInputInTitle}
          renderFormItems={renderFormItems}
          addButtonText={addButtonText}
        />
      )}
    </FieldBase>
  );
};

export default Repeater;
