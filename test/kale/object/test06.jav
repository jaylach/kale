object @foo {
  set .inner %{
    var left = parseInt(node.value.one);
    var right = parseInt(node.value.two);

    return left + right;
  %}
}