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
  : MemberExpression
  | MemberExpression NPOINTER STRING
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
  : MemberExpression Block
      {
        $1.body = $2;
        $$ = $1;
      }
  | MemberExpression NPOINTER STRING Block
      {
        $1.name = $3;
        $1.body = $4;
        $$ = $1;
      }
  ;

MemberExpression
  : THISTOKEN IDENTIFIER
      {
        $$ = new yy.Property($2, $2, 'GLOBAL');
      }
  | DOT IDENTIFIER
      {
        $$ = new yy.Property($2, $2, 'THIS');
      }
  | DOT STRING
      {
        $$ = new yy.Property($2, $2, 'THIS');
      }
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