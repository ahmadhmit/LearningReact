var HomeApp = React.createClass({
	getInitialState: function(){
		return {
			stateId: 0
		}

	},

	handleStateFilterUpdate: function(stateId){
		// repopulate the tagslist suburb filter
		
		this.setState({stateId: stateId});
	},

	handleSuburbFilterUpdate: function(tag){
		// repopulate the tagslist suburb filter
		this.setState({tag: tag});
	},

  render: function() {
    return (
    		<div>
    		<div>
    			<StateFilter updateFilter={this.handleStateFilterUpdate} />
    			<SuburbFilter stateId={this.state.stateId} updateFilter={this.handleSuburbFilterUpdate} />
    		</div>
    		<div>
    			
    			<MapWidget shownPolygonByTag={this.state.tag} />
    		</div>
    		</div>
    	);
  }
});
