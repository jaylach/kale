/* Operator Precedence */
%left OR
%left AND
%left '<' '>' '<=' '>=' '!=' '=='
%left '+' '-'
%left '*' '/' '%'

%start template

%%

template
  : block_node_expression EOF
  ;

expressions
  : expression
  | expressions expression
  ;

expression
  : block_node_expression
  | leaf_node_expression
  ;

/* 
    Node Blocks 
*/
block_node_expression
  : block_node_type node_attribute_lookups END
  | block_node_type node_attribute_lookups expressions END
  ;

leaf_node_expression
  : leaf_node_type node_attribute_lookups 
  ;

/* 
    Node Lookups 
*/
node_attribute_lookups
  : node_attribute_lookup
  | node_attribute_lookups COMMA node_attribute_lookup
  ;

node_attribute_lookup
  : node_lookup
  | node_lookup node_attribute_statement
  ;

node_lookup
  : global_node_lookup
  | local_node_lookup
  ;

global_node_lookup
  : GLOBAL_GLYPH local_node_lookup
  ;

local_node_lookup
  : IDENTIFIER
  | OPEN_BRACKET STRING CLOSE_BRACKET
  | local_node_lookup DOT IDENTIFIER
  | local_node_lookup OPEN_BRACKET STRING CLOSE_BRACKET
  ;

/* 
    Node Attributes 
*/
node_attribute_statement
  : OPEN_PARENTHESE node_attribute_setters CLOSE_PARENTHESE
  ;

node_attribute_setters
  : node_attribute_setter
  | node_attribute_setters COMMA node_attribute_setter
  ;

node_attribute_setter 
  : ATTRIBUTE ASSIGN STRING
  ;

/* 
    Node Types 
*/
block_node_type
  : OBJECT
  | ARRAY
  ;

leaf_node_type
  : PROPERTY
  ;
