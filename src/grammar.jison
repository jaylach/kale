/* Operator Precedence */
%left OR
%left AND
%left '<' '>' '<=' '>='
%left '==' '!='
%left '+' '-'
%left '*' '/' '%'
%left NOT
%right '^'

%start file

%%

file
  : block_node_statement EOF
  ;

opt_statement_list
  : 
  | statement_list
  ;

statement_list
  : statement
  | statement_list statement
  ;

statement
  : last_statement
  | block_node_statement
  | leaf_node_statement
  | custom_node_block_statement
  | if_block
  | COMMENT
  ;

last_statement
  : RETURN expression
  ;

/* 
    Node Blocks 
*/
custom_node_block_statement
  : node_type_list STRING AS opt_statement_list END
  ;

block_node_statement
  : block_node_type node_attribute_list opt_statement_list END
  ;

leaf_node_statement
  : leaf_node_type node_attribute_list 
  | leaf_node_statement ':' if_expression
  ;

/* 
    Node Lookups 
*/
node_attribute_list
  : node_attribute
  | node_attribute_list ',' node_attribute
  ;

node_attribute
  : node_lookup
  | node_lookup node_attribute_statement
  ;

node_lookup
  : global_node_lookup
  | local_node_lookup
  ;

global_node_lookup
  : '@' local_node_lookup
  ;

local_node_lookup
  : IDENTIFIER
  | '[' STRING ']'
  | local_node_lookup '.' IDENTIFIER
  | local_node_lookup '[' STRING ']'
  ;

/* 
    Node Attributes 
*/
attribute_statement
  : '(' attribute_setter_list ')'
  ;

attribute_setter_list
  : attribute_setter
  | attribute_setter_list ',' attribute_setter
  ;

attribute_setter 
  : ATTRIBUTE '=' STRING
  ;

/*
    Conditions
*/
if_block
  : if_expression THEN opt_statement_list opt_elseif_block_list opt_else_block END
  ;

opt_else_block
  : 
  | ELSE opt_statement_list
  ;

opt_elseif_block_list
  : 
  | elseif_block_list
  ;

elseif_block_list
  : elseif_block
  | elseif_block_list elseif_block
  ;

elseif_block
  : ELSEIF expression THEN opt_statement_list
  ;

if_expression
  : IF expression
  ;

expression
  : TRUE
  | FALSE
  | NULL
  | STRING
  | NUMBER
  | IDENTIFIER
  | '[' STRING ']'
  | '(' expression ')'
  | expression '==' expression
  | expression '!=' expression
  | expression '+' expression
  | expression '-' expression
  | expression '*' expression
  | expression '/' expression
  | expression '^' expression
  | expression '%' expression
  | expression '<' expression
  | expression '<=' expression
  | expression '>' expression
  | expression '>=' expression
  | expression AND expression
  | expression OR expression
  | NOT expression
  ;

/* 
    Node Types 
*/
node_type_list
  : block_node_type
  | leaf_node_type
  ;

block_node_type
  : OBJECT
  | ARRAY
  ;

leaf_node_type
  : PROPERTY
  ;
