%start Template

%left MemberExpression
%left DOT

%%

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

TemplateElement
  : Statement
  | ConfigSetter
  | Comment
      {
        $$ = new yy.Comment($1);
      }
  ;

Block
  : TemplateBlock
  | ScriptBlock
  ;

Comment
  : COMMENT_BLOCK
  | COMMENT
  ;

TemplateBlock
  : OPEN_BRACE CLOSE_BRACE
      {
        $$ = [];
      }
  | OPEN_BRACE TemplateElements CLOSE_BRACE
      {
        $$ = $2;
      }
  ;

ScriptBlock
  : SCRIPTBLOCK
      { 
        $$ = new yy.Node('SCRIPT', $1);
      }
  ;

Keyword
  : OBJECT
  | ARRAY
  | SET
  ;

Boolean
  : TRUE
  | FALSE
  ;

ConfigSetter
  : ConfigProperty EQUALS Boolean
      {
        $$ = [ new yy.Config($1, $3) ];
      }
  | ConfigSetter COMMA ConfigProperty EQUALS Boolean
      {
        $1.push(new yy.Config($3, $5));
        $$ = $1
      }
  ;

ConfigProperty
  : COPY
  | NAMED
  ;

StatementExpression
  : Keyword PropertyLookups
      {
        var prop = new yy.Action($1, $2)
        $$ = prop;
      }
  | Keyword PropertyLookupBlock
      {
        var prop = new yy.Action($1, $2)
        $$ = prop;
      }
  | PropertyLookups
  | PropertyLookupBlock
  ;

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
        $$ = [ $1 ] 
      }
  | PropertyLookups COMMA PropertyLookup
      {
        $1.push($3)
        $$ = $1
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
  | MemberExpression OPEN_BRACKET STRING CLOSE_BRACKET
      {
        var prop = new yy.Property($3, $3, 'PARENT');
        $1.body.push(prop);
      }
  | MemberExpression DOT IDENTIFIER
      {
        var prop = new yy.Property($3, $3, 'PARENT');
        $1.body.push(prop);
      }
  ;

Statement
  : StatementExpression
  ;