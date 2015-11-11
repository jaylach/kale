%left '+' '-' '*' '\' '==' '!=' '<=' '>='


%start template

%%

template
  : import_list template_def EOF
    {
      $2.imports = $1;
      return $2;
    }
  | template_def EOF
    { return $1; }
  ;

import
  : IMPORT import_identifier FROM STRING
    { 
      $$ = new yy.ImportNode(@1.first_line, @1.first_column, $2, $4);
    }
  | IMPORT '{' import_identifier_list '}' FROM STRING
    {
      var imports = [];
      $3.forEach(function(ident) {
        imports.push(new yy.ImportNode(@1.first_line, @1.first_column, ident, $6));
      });

      $$ = imports;
    }
  ;

import_list
  : import
    {
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | import_list import 
    {
      $$ = $1.concat($2);
    }
  ;

import_identifier
  : IDENTIFIER
  | '*'
  ;

import_identifier_list
  : IDENTIFIER
    {
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | import_identifier_list ',' IDENTIFIER
    {
      $$ = $1.concat($3);
    }
  ;

template_def
  : block_with_actions
    {
      $$ = new yy.TemplateNode(@1.first_line, @1.first_column, $1);
    }
  ;

block
  : '{' property_list '}'
    {
      $$ = new yy.BlockNode(@1.first_line, @1.first_column, $2);
    }
  | '{' '}'
    {
      $$ = new yy.BlockNode(@1.first_line, @1.first_column, []);
    }
  ;

block_with_actions
  : block
  | block '(' action_list ')'
    {
      $$ = $1;
      $$.actions = $3;
    }
  ;

property
  : IDENTIFIER ':' property_value
    {
      $$ = new yy.PropertyNode(@1.first_line, @1.first_column, $1, $3);
    }
  | STRING ':' property_value
    {
      $$ = new yy.PropertyNode(@1.first_line, @1.first_column, $1, $3);
    }
  | IDENTIFIER ':' block_with_actions
    {
      $$ = new yy.PropertyNode(@1.first_line, @1.first_column, $1, $3);
    }
  | STRING ':' block_with_actions
    {
      $$ = new yy.PropertyNode(@1.first_line, @1.first_column, $1, $3);
    }
  | IDENTIFIER
    {
      var value = new yy.ValueNode(@1.first_line, @1.first_column, new yy.AccessorNode(@1.first_line, @1.first_column, $1));
      $$ = new yy.PropertyNode(@1.first_line, @1.first_column, $1, value);
    }
  ;

property_list
  : property
    {
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | property_list ',' property
    {
      $$ = $1.concat($3);
    }
  ;

accessor
  : IDENTIFIER
    {
      $$ = new yy.AccessorNode(@1.first_line, @1.first_column, $1);
    }
  | '[' STRING ']'
    {
      $$ = new yy.AccessorNode(@1.first_line, @1.first_column, $2);
    }
  | accessor '.' IDENTIFIER
    {
      $1.addProperty($3);
    }
  | accessor '[' STRING ']'
    {
      $1.addProperty($3);
    }
  ;

property_value
  : value
  | operation_list
  ;

value
  : binding
    {
      $$ = new yy.ValueNode(@1.first_line, @1.first_column, $1);
    }
  | STRING
    {
      $$ = new yy.ValueNode(@1.first_line, @1.first_column, $1);
    }
  | NUMBER
    {
      $$ = new yy.ValueNode(@1.first_line, @1.first_column, parseInt($1));
    }
  ;

operation_list
  : operation
  | operation_list operator value
    { $$ = new yy.OperatorNode(@1.first_line, @1.first_column, $1, $3, $2); }
  ;

operation
  : value operator value
    { $$ = new yy.OperatorNode(@1.first_line, @1.first_column, $1, $3, $2); }
  ;

operator
  : '+'
  | '-'
  | '*'
  | '\'
  | '=='
  | '>='
  | '<='
  | '!='
  ;

binding 
  : accessor
  | accessor '.' action_list
    {
      $$ = $1;
      $$.actions = $3;
    }
  ;

action
  : IDENTIFIER '(' ')'
    { 
      $$ = new yy.ActionNode(@1.first_line, @1.first_column, $1);
    }
  | IDENTIFIER '(' action_parameter_list ')'
    {
      $$ = new yy.ActionNode(@1.first_line, @1.first_column, $1, $3);
    }
  ;

action_list
  : action
    {
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | action_list '.' action
    {
      $$ = $1.concat($3);
    }
  ;

action_parameter
  : accessor
  | STRING
    {
      $$ = new yy.ValueNode(@1.first_line, @1.first_column, $1);
    }
  | NUMBER
    {
      $$ = new yy.ValueNode(@1.first_line, @1.first_column, parseInt($1));
    }
  | block
  ;

action_parameter_list
  : action_parameter
    {
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | action_parameter_list ',' action_parameter
    {
      $$ = $1.concat($3);
    }
  ;