// Dynamic form field components registry - one-liner export
const fieldComponents = {
  Text: require("./Text").default,
  TextArea: require("./TextArea").default,
  Textarea: require("./TextArea").default, // fallback for legacy
  Number: require("./Number").default,
  Password: require("./Password").default,
  Select: require("./Select").default,
  Tag: require("./Tag").default,
  Radio: require("./Radio").default,
  Checkbox: require("./Checkbox").default,
  Switch: require("./Switch").default,
  Date: require("./Date").default,
  MediaUpload: require("./MediaUpload").default,
  Slider: require("./Slider").default,
  Color: require("./Color").default,
  Rating: require("./Rating").default,
  Json: require("./Json").default,
  Tabs: require("./Tabs").default,
  Accordion: require("./Accordion").default,
  Collapse: require("./Accordion").default, // alias for Accordion
  Repeater: require("./Repeater").default,
  Grid: require("./Grid").default,
  AutoGrid: require("./AutoGrid").default,
  Divider: require("./Divider").default,
  Card: require("./Card").default,
  MultiSelect: require("./MultiSelect").default,
  GridSelect: require("./GridSelect").default,
  Container: require("./Container").default,
  Flex: require("./Container").default, // alias for Container
  Alert: require("./Alert").default,
  Title: require("./Title").default,
  Space: require("./Space").default,
  Html: require("./Html").default,
};

export default fieldComponents;
