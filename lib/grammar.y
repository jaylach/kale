%start Template

%left MemberExpression
%left PropertyExpression
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
        $$ = [ $1 ]; 
      }
  | TemplateElements TemplateElement
      {
        $1.push($2);
        $$ = $1;
      }
  ;

TemplateElement
  : Statement
  ;

Block
  : TemplateBlock
  | ScriptBlock
  ;

TemplateBlock
  : OPENBRACE CLOSEBRACE
      {
        $$ = [];
      }
  | OPENBRACE TemplateElements CLOSEBRACE
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

StatementExpression
  : Keyword PropertyLookup
      {
        var prop = new yy.Action($1, $2)
        $$ = prop;
      }
  | Keyword PropertyExpression
      {
        var prop = new yy.Action($1, $2)
        $$ = prop;
      }
  | PropertyLookup
  ;

PropertyLookup
  : PropertyExpression Block
      {
        $1.body = $2;
        $$ = $1;
      }
  | PropertyExpression NPOINTER STRING
      {
        $1.name = $3;
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
  | MemberExpression OPENBRACKET STRING CLOSEBRACKET
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
  | PropertyExpression
  ;