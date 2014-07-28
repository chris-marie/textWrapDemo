function() {
    // general setup, declare variables
    var demo = d3.select('div#demo'),
    svg = demo.select('svg'),
    total_width = svg.style('width').replace('px', ''),
    total_height = svg.style('height').replace('px', ''),
    increment = 10,
    margin = {top: increment, right: increment, bottom: increment, left: increment},
    width = total_width - margin.left - margin.right,
    height = total_height - margin.top - margin.bottom,
    wrapper,
    rect_1,
    rect_2,
    rect_3;
    wrapper = svg.append('g')
	.classed('wrapper', true)
	.attr('transform', 'translate(' + margin.top + ',' + margin.left + ')');
    // create three rectangles
    rect_1 = wrapper.append('g').classed('target-wrapper', true)
	.append('rect')
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', width * 0.4)
	.attr('height', height)
	.classed('target', true)
	.attr('id', 'rect-1');
    rect_2 = wrapper.append('g').classed('target-wrapper', true)
	.append('rect')
	.attr('x', width * 0.4 + increment)
	.attr('y', 0)
	.attr('width', width * 0.35 - increment)
	.attr('height', height)
	.classed('target', true)
	.attr('id', 'rect-2');
    rect_3 = wrapper.append('g').classed('target-wrapper', true)
	.append('rect')
	.attr('x', width * 0.75 + increment)
	.attr('y', 0)
	.attr('width', width * 0.25 - increment)
	.attr('height', height)
	.classed('target', true)
	.attr('id', 'rect-3');
    // wrap text into rectangle on click
    d3.selectAll('.target').on('click', function() {
	var padding,
	bounds,
	target_wrapper,
	text_wrapper,
	text_node,
	text_content;
	// remove any text which is already present
	d3.selectAll('g.text-wrapper').remove();
	// text node and wrapper group will be added to the parent group
	target_wrapper = d3.select(this.parentNode);
	text_wrapper = target_wrapper.append('g').classed('text-wrapper', true);
	// use the selected rect element as the bounds
	bounds = d3.select(this);
	// add a text node and transfer the textarea content to it
	text_node = text_wrapper.append('text');
	text_content = d3.select('div#demo textarea').property('value');
	text_node.text(text_content);
	// get current padding value, or default to 0
	padding = parseInt(demo.select('input#padding').property('value')) || 0;
	// wrap text to the rectangle in the same group
	text_node.textwrap(bounds, padding);
    });
}).call(this);
