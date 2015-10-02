var StateFilter = React.createClass({

	/* Set the default tags state*/
  getInitialState:function(){
    return {
      dataStates: []
    }
  },

	componentWillMount: function(){
		
		var data = getStates();
		this.setState({dataStates: data});
		
	},

	componentDidMount: function(){

	},

	handleChangeState: function(){
		var selectedValue = this.refs.stateFilter.getDOMNode().value;
		this.props.updateFilter(selectedValue);
	},

  render: function() {
    var states = this.state.dataStates.map(function(stateItem){
    	return <StateOption data={stateItem} />
    });
    return (
    	<select option ref="stateFilter" onChange={this.handleChangeState} >{states}</select>
    );
  }
});

var StateOption = React.createClass({
	render: function(){
		return (
			<option value={this.props.data.id}>{this.props.data.name}</option>
		);

	}
});
