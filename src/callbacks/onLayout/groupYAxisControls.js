import { select } from 'd3';

export default function groupYAxisControls() {
    //Define a container in which to place y-axis controls.
    const grouping = this.controls.wrap
        .insert('div', '.y-axis')
        .style({
            display: 'inline-block',
            'margin-right': '5px'
        })
        .append('fieldset')
        .style('padding', '0px 2px');
    grouping.append('legend').text('Y-axis');

    //Move each y-axis control into container.
    this.controls.wrap.selectAll('.y-axis').each(function(d) {
        this.style.marginTop = '0px';
        this.style.marginRight = '2px';
        this.style.marginBottom = '2px';
        this.style.marginLeft = '2px';
        grouping.node().appendChild(this);

        //Radio buttons sit too low.
        if (d.option === 'y.type')
            select(this)
                .selectAll('input[type=radio]')
                .style({
                    top: '-.1em'
                });
    });
}
