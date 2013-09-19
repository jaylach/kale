###
  TEST
###

object @test {
  # Settings
  -named, -copy

  # Properties
  .foo

  set .baz %{
    return parent.bar + ' ' + value;
  %}

  # Array
  array .qux {
    .one => '1', .two => '2'
  }
}
