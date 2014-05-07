/* Operator Precedence */
%left OR
%left AND
%left '<' '>' '<=' '>='
%left '==' '!='
%left '+' '-'
%left '*' '/' '%'
%left NOT
%right '^'

%start template

%%

template
  : first_statement EOF
    {
      $$ = new yy.Template($1);
      return $$;
    }
  ;

opt_statement_list
  : 
    { $$ = []; }
  | statement_list
  ;

statement_list
  : statement
    { 
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ]; 
      }
    }
  | statement_list statement
    { 
      $$ = $1.concat($2); 
    }
  ;

statement
  : last_statement
  | block_node_statement
  | leaf_node_statement
  | custom_node_block_statement
  | if_block
  | COMMENT
    { $$ = new yy.Comment($1); }
  ;

first_statement
  : block_node_statement
  | COMMENT
  ;

last_statement
  : RETURN expression
    { $$ = new yy.Return($2); }
  ;

/* 
    Node Blocks 
*/
custom_node_block_statement
  : node_type_list STRING AS opt_statement_list END
    { $$ = new yy.CustomProperty($2, $4); }
  ;

block_node_statement
  : block_node_type node_attribute opt_statement_list END
    {
      var outKey = $2.getOutKey();
      delete $2['attributes'];

      if ( $1 === 'object' ) {
        $$ = new yy.ObjectBlock($2, outKey, $3);
      }
      else if ( $1 === 'array' ) {
        $$ = new yy.ArrayBlock($2, outKey, $3);
      }
    }
  ;

leaf_node_statement
  : leaf_node_type node_attribute_list
    { 
      $$ = $2.map(function(item) {
        var outKey = item.getOutKey();
        delete item['attributes'];

        return new yy.Property('PROPERTY', item, outKey);
      });
    }
  | leaf_node_statement ':' if_expression
    { 
      $3.body = $1; 
      $$ = $3;
    }
  ;

/* 
    Node Accessors 
*/
node_attribute_list
  : node_attribute
    { $$ = [ $1 ]; }
  | node_attribute_list ',' node_attribute
    { $1.push($3); }
  ;

node_attribute
  : node_accessor
  | node_accessor attribute_statement
    { $1.attributes = $2 }
  ;

node_accessor
  : global_node_accessor
  | local_node_accessor
  ;

global_node_accessor
  : '@' local_node_accessor
    { 
      $2.base.isGlobal = true;
      $$ = $2;
    }
  ;

local_node_accessor
  : identifier
    { $$ = new yy.Accessor($1); }
  | '[' STRING ']'
    { $$ = new yy.Accessor(new yy.Identifier($2)); }
  | local_node_accessor '.' identifier
    { $1.addProperty($3); }
  | local_node_accessor '[' STRING ']'
    { $1.addProperty(new yy.Identifier($3)); }
  ;

/* 
    Node Attributes 
*/
attribute_statement
  : '(' attribute_setter_list ')'
    { $$ = $2; }
  ;

attribute_setter_list
  : attribute_setter
  | attribute_setter_list ',' attribute_setter
    { $1.addAttribute($3); }
  ;

attribute_setter 
  : ATTRIBUTE '=' STRING
    { $$ = new yy.Attribute($1, $3); }
  | ATTRIBUTE '=' TRUE
    { $$ = new yy.Attribute($1, true); }
  | ATTRIBUTE '=' FALSE
    { $$ = new yy.Attribute($1, false); }
  ;

/*
    Conditions
*/
if_block
  : if_expression THEN opt_statement_list opt_elseif_block_list opt_else_block END
    {
      $1.body = $3;
      $$ = [ $1 ];

      if ( $4 != null ) $$.push($4);
      if ( $5 != null ) $$.push($5);
    }
  ;

opt_else_block
  : 
  | ELSE opt_statement_list
    { $$ = new yy.ConditionBlock('else', null, $2); }
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
    { $$ = new yy.ConditionBlock('else if', $2, $4); }
  ;

if_expression
  : IF expression
    { $$ = new yy.ConditionBlock('if', $2, []); }
  ;

expression
  : TRUE
    { $$ = new yy.Literal($1); }
  | FALSE
    { $$ = new yy.Literal($1); }
  | NULL
    { $$ = new yy.Literal($1); }
  | STRING
    { $$ = new yy.Literal('"' + $1 + '"'); }
  | NUMBER
    { $$ = new yy.Literal($1); }
  | identifier
  | '[' STRING ']'
    { $$ = new yy.Identifier($2); }
  | '(' expression ')'
    {
      $2.wrapped = true; 
      $$ = $2; 
    }
  | expression '==' expression
    { $$ = new yy.Operation('===', $1, $3); }
  | expression '!=' expression
    { $$ = new yy.Operation('!==', $1, $3); }
  | expression '+' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '-' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '*' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '/' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '^' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '%' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '<' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '<=' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '>' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression '>=' expression
    { $$ = new yy.Operation($2, $1, $3); }
  | expression AND expression
    { $$ = new yy.Operation('&&', $1, $3); }
  | expression OR expression
    { $$ = new yy.Operation('||', $1, $3); }
  | NOT expression
    { $$ = new yy.Operation('!', null, $2); }
  ;

/* 
    Helpers
*/
identifier
  : IDENTIFIER
    { $$ = new yy.Identifier($1); }
  ;

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
