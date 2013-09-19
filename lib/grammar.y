%start Template

%left MemberExpression
%left DOT

%%

/*
 *  Root
 */

Template
  : 
      {
        $$ = new yy.Template([]);
        return $$;
      }
  | TemplateElements EOF 
      { 
        $$ = new yy.Template($1);
        return $$;
      }
  ;

/*
 *  TemplateElements
 */

TemplateElement
  : Statement
  | Comment
      {
        $$ = new yy.Comment($1);
      }
  ;

TemplateElements
  : TemplateElement
      { 
        if ( Array.isArray($1) ) {
          $$ = $1;
        }
        else {
          $$ = [ $1 ]; 
        }
      }
  | TemplateElements TemplateElement
      {
        if ( Array.isArray($2) ) {
          $1 = $1.concat($2);
        }
        else {
          $1.push($2);
        }
        $$ = $1;
      }
  ;

Statement
  : StatementExpression
  ;

StatementExpression
  : Keyword PropertyLookups
      {
        if ( Array.isArray($2) && $2.length === 1 ) {
          $$ = new yy.Action($1, $2[0]);
        }
        else {
          var actions = [];
          $2.forEach(function(action) {
            actions.push(new yy.Action($1, action));
          });

          $$ = actions;
        }
      }
  | Keyword PropertyLookupBlock
      {
        $$ = new yy.Action($1, $2);
      }
  ;

Block
  : TemplateBlock
  | ScriptBlock
  ;

ScriptBlock
  : SCRIPTBLOCK
      { 
        $$ = new yy.Node('SCRIPT', $1);
      }
  ;

/* 
 *  TemplateBlock
 */

TemplateBlock
  : OPEN_BRACE CLOSE_BRACE
      {
        $$ = [];
      }
  | OPEN_BRACE TemplateBlockElements CLOSE_BRACE
      {
        $$ = $2;
      }
  ;

TemplateBlockElement
  : PropertyLookups
  | TemplateElement
  | ConfigSetter
  ;

TemplateBlockElements
  : TemplateBlockElement
      { 
        if ( Array.isArray($1) ) {
          $$ = $1;
        }
        else {
          $$ = [ $1 ]; 
        }
      }
  | TemplateBlockElements TemplateBlockElement
      {
        if ( Array.isArray($2) ) {
          $1 = $1.concat($2);
        }
        else {
          $1.push($2);
        }
        $$ = $1;
      }
  ;

/*
 *  Properties
 */

PropertyLookup
  : PropertyExpression
  | PropertyExpression NPOINTER STRING
      {
        $1.name = $3;
        $$ = $1;
      }
  ;

PropertyLookups
  : PropertyLookup
      { 
        $$ = [ $1 ];
      }
  | PropertyLookups COMMA PropertyLookup
      {
        $1.push($3);
        $$ = $1;
      }
  ;

PropertyLookupBlock 
  : PropertyExpression Block
      {
        $1.body = $2;
        $$ = $1;
      }
  | PropertyExpression NPOINTER STRING Block
      {
        $1.name = $3;
        $1.body = $4;
        $$ = $1;
      }
  ;

PropertyExpression
  : MemberExpression
  | DOT IDENTIFIER
      {
        $$ = new yy.Property($2, $2, 'THIS');
      }
  ;  

MemberExpression
  : THISTOKEN IDENTIFIER
      {
        $$ = new yy.Property($2, $2, 'GLOBAL');
      }
  /*| MemberExpression OPEN_BRACKET STRING CLOSE_BRACKET
      {
        var prop = new yy.Property($3, $3, 'PARENT');
        $1.body.push(prop);
      }
  | MemberExpression DOT IDENTIFIER
      {
        var prop = new yy.Property($3, $3, 'PARENT');
        $1.body.push(prop);
      }*/
  ;

/* 
 *  Config Actions
 */

ConfigSetter
  : ConfigProperty
      {
        if ( Array.isArray($1) ) {
          $$ = $1;
        }
        else {
          $$ = [ $1 ]; 
        }
      }
  | ConfigSetter COMMA ConfigProperty
      { 
        $1.push($3);
        $$ = $1;
      }
  ;

ConfigProperty
  : PLUS COPY
      { $$ = new yy.Config($2, true); }
  | MINUS COPY
      { $$ = new yy.Config($2, false); }
  | PLUS NAMED
      { $$ = new yy.Config($2, true); }
  | MINUS NAMED
      { $$ = new yy.Config($2, false); }
  ;

/*
 *  Helpers
 */

Comment
  : COMMENT_BLOCK
  | COMMENT
  ;

Keyword
  : OBJECT
  | ARRAY
  | SET
      { $$ = 'property' }
  ;

Boolean
  : TRUE
  | FALSE
  ;