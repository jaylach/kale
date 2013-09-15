%start Template

%left DOT
%left MemberExpression
%left PropertySetter
%right IdentifierName

%%

Template
  : 
  | TemplateElements EOF 
      { return ['Template', $1]; }
  ;

TemplateElements
  : TemplateElement
  | TemplateElements TemplateElement
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
  | OPENBRACE TemplateElements CLOSEBRACE
  ;

ScriptBlock
  : SCRIPTBLOCK
  ;

Keyword
  : OBJECT
  | ARRAY
  | SET
  ;

SetterStatement
  : Keyword PropertyLookup
  | PropertyLookup
  ;

PropertyLookup
  : PropertyExpression Block
  | PropertyExpression NPOINTER StringIdentifier
  | PropertyExpression NPOINTER STRIDENTIFIER Block
  ;

PropertyExpression
  : MemberExpression
  | DOT IdentifierName
  ;  

MemberExpression
  : IdentifierName
  | THISTOKEN IdentifierName
  | MemberExpression '[' StringIdentifier ']'
  | MemberExpression DOT IdentifierName
  ;

Statement
  : SetterStatement
  | PropertyExpression
  ;

IdentifierName
  : IDENTIFIER
  ;

StringIdentifier
  : STRIDENTIFIER
  ;