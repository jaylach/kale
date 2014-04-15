%start Template

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
  ;

TemplateElements
  : TemplateElement
  | TemplateElements TemplateElement
  ;

/*
 * Nodes
 */

NodeExpression
  : NodeType NodeLookups
  ;

NodeBlockExpression
  : BlockNodeType NodeLookup
  ;

NodeBlock
  : NodeBlockExpression END
  | NodeBlockExpression TemplateElements END
  ;

CustomNodeBlockExpression
  : BlockNodeType IDENTIFIER AS
  | BlockNodeType STRING AS
  | NodeType IDENTIFIER AS
  | NodeType STRING AS
  ;

CustomNodeBlock
  : CustomNodeBlockExpression END
  | CustomNodeBlockExpression TemplateElements END
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