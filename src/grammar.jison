%start Template

%left SCRIPT

%%

/* 
 *  Root 
 */

Template
  : 
  | TemplateElements EOF
  ;

/*
 *  TemplateElements
 */

TemplateElement
  : NodeExpression
  | NodeBlock
  | CustomNodeBlock
  | COMMENT
  ;

TemplateElements
  : TemplateElement
  | TemplateElements TemplateElement
  ;

CustomNodeElements
  : TemplateElements
  | RETURN SCRIPT
  ;

/*
 * Nodes
 */

NodeExpression
  : NodeType NodeAttributeLookups
  ;

NodeBlockExpression
  : BlockNodeType NodeAttributeLookup
  ;

NodeBlock
  : NodeBlockExpression END
  | NodeBlockExpression TemplateElements END
  ;

CustomNodeBlockExpression
  : BlockNodeType IDENTIFIER
  | NodeType IDENTIFIER
  ;

CustomNodeBlock
  : CustomNodeBlockExpression AS END
  | CustomNodeBlockExpression AS SCRIPT_PARAM SCRIPT
  | CustomNodeBlockExpression AS CustomNodeElements END
  ;

NodeLookup
  : IDENTIFIER
  | STRING
  | GLOBAL_GLYPH IDENTIFIER
  | GLOBAL_GLYPH STRING
  | NodeLookup DOT IDENTIFIER
  | NodeLookup OPEN_BRACKET STRING CLOSE_BRACKET
  ;

NodeLookups
  : NodeLookup
  | NodeLookups COMMA NodeLookup
  ;

NodeAttributeLookup
  : NodeLookup
  | NodeLookup NodeAttributeExpression
  ;

NodeAttributeLookups
  : NodeAttributeLookup
  | NodeAttributeLookups COMMA NodeAttributeLookup
  ;

/*
 *  Attributes
 */

NodeAttributeSetter
  : ATTRIBUTE EQUALS STRING
  ;

NodeAttributeSetters
  : NodeAttributeSetter
  | NodeAttributeSetters COMMA NodeAttributeSetter
  ;

NodeAttributeExpression
  : OPEN_PARENTHESE NodeAttributeSetters CLOSE_PARENTHESE
  ;

/*
 *  Keywords
 */

BlockNodeType
  : OBJECT
  | ARRAY
  ;

NodeType
  : PROPERTY
  ;