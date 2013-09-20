script %{
  
%}

object @test {
  # Settings
  -named, -copy

  # Properties
  .foo

  set .baz %{
    return parent.bar + ' ' + node.value;
  %}

  # Array
  array .qux {
    .one => '1', .two => '2'
  }
}
