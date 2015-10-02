var SuburbFilter = React.createClass({
  
  /* Set the default tags state*/
  getInitialState:function(){
    return {
      availableTags: []
    }
  },

  updateTags(newTags){
    this.setState({tags: newTags});
  },

  /*Get Data*/
  componentWillMount: function(){
    // Get Data from back end using getAvailableTags function
    var availableTagList = getAvailableTags('');
    this.setState({availableTags: availableTagList});
  },

  /* Set to autocomplete*/
  componentDidMount: function(){
    this.initAutoComplete();
    console.log(this.state.availableTags.length);
  },

  initAutoComplete: function(){
    var updateFunction = this.handleFilterChange;
    $(this.refs.postcode.getDOMNode()).autocomplete({
      source: this.state.availableTags,
      select: function(event, ui){
        updateFunction(ui.item.value);
      }
    });
  },

  componentWillReceiveProps: function(nextProps)
  {
    var availableTagList = getAvailableTags(nextProps.stateId);
    this.setState({availableTags: availableTagList});
    
  },

  handleFilterChange: function(tag)
  {
    this.props.updateFilter(tag);
  },

  componentDidUpdate: function(prevProps, prevState){
    console.log(this.state.availableTags.length); 
    this.initAutoComplete();

  },

  render: function() {
    return (
      <input type="text" ref="postcode" />
    );
  }
});
