%left '+'

%start template

%%

template
  : template_def_list EOF
    { return $1; }
  ;

template_def_list 
  : template_def
    {
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | template_def_list template_def
    {
      $$ = $1.concat($2)
    }
  ;

template_def
  : IDENTIFIER '=>' block
    { 
      $$ = new yy.TemplateDef('NEW', $1, $3);
    }
  | IDENTIFIER '->' block
    { 
      $$ = new yy.TemplateDef('MODIFY', $1, $3);
    }
  | IDENTIFIER '=>' block '(' action_list ')'
    { 
      $$ = new yy.TemplateDef('NEW', $1, $3);
      $$.actions = $5;
    }
  | IDENTIFIER '->' block '(' action_list ')'
    { 
      $$ = new yy.TemplateDef('MODIFY', $1, $3);
      $$.actions = $5;
    }
  ;

block
  : '{' property_list '}'
    {
      $$ = new yy.Block('BLOCK', $2);
    }
  | '{' '}'
    {
      $$ = new yy.Block('BLOCK', []);
    }
  ;

property
  : IDENTIFIER ':' value
    {
      $$ = new yy.Property($1, $3);
    }
  | STRING ':' value
    {
      $$ = new yy.Property($1, $3);
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

simple_property
  : IDENTIFIER ':' STRING
    {
      $$ = new yy.Property($1, new yy.Value('STRING', $3));
    }
  | IDENTIFIER ':' NUMBER
    {
      $$ = new yy.Property($1, new yy.Value('NUMBER', parseInt($3)));
    }
  | STRING ':' STRING
    {
      $$ = new yy.Property($1, new yy.Value('STRING', $3));
    }
  | STRING ':' NUMBER
    {
      $$ = new yy.Property($1, new yy.Value('NUMBER', parseInt($3)));
    }
  ;

simple_property_list
  : simple_property
    {
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | simple_property_list ',' simple_property
    {
      $$ = $1.concat($3);
    }
  ;

accessor
  : IDENTIFIER
    { $$ = new yy.Accessor($1); }
  | '[' STRING ']'
    { $$ = new yy.Accessor($2); }
  | accessor '.' IDENTIFIER
    { $1.addProperty($3); }
  | accessor '[' STRING ']'
    { $1.addProperty($3); }
  ;

value
  : binding
  | STRING
    { $$ = new yy.Value('STRING', $1); }
  | NUMBER
    { $$ = new yy.Value('NUMBER', parseInt($1)); }
  | value '+' value
    { $$ = new yy.Operation($1, $3, $2); }
  ;

binding 
  : '{{' accessor '}}'
    { $$ = new yy.Value('BINDING', $2); }
  | '{{' accessor '|' action_list '}}'
    {
      $$ = new yy.Value('BINDING', $2);
      $$.actions = $4;
    }
  ;

action
  : IDENTIFIER
    { $$ = new yy.Action($1); }
  | IDENTIFIER ':' action_parameter_list
    {   
      $$ = new yy.Action($1, $3); 
    }
  | '!' IDENTIFIER ':' action_parameter_list
    {
      $$ = new yy.Action($1 + $2, $4); 
    }
  | '@' IDENTIFIER
    { $$ = new yy.Action($1 + $2); }
  ;

action_list
  : action
    {
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | action_list '|' action
    {
      $$ = $1.concat($3);
    }
  ;

action_parameter
  : accessor
    { $$ = $1 }
  | STRING
    { $$ = new yy.Value('STRING', $1); }
  | NUMBER
    { $$ = new yy.Value('NUMBER', parseInt($1)); }
  | '{' simple_property_list '}'
    { $$ = new yy.Value('JSON', $2); }
  ;

action_parameter_list
  : action_parameter
    { 
      if ( !Array.isArray($1) ) {
        $$ = [ $1 ];
      }
    }
  | action_parameter_list ',' action_parameter
    { $$ = $1.concat($3); }
  ;