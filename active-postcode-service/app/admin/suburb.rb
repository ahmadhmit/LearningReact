ActiveAdmin.register Suburb do
  
  # ... initialize params
  permit_params :state_id, :post_code_id, :name
  
  # ... default sort order
  config.sort_order = "id_asc"

  # ... layouting the table
  index do
    selectable_column
    column State.name, :state, :sortable => 'states.name'
    column :name
    column :poa_code , :post_code, :sortable => 'post_codes.poa_code' do |suburb| suburb.post_code.poa_code end
    column :poa_name , :post_code, :sortable => 'post_codes.poa_name' do |suburb| suburb.post_code.poa_name end
    actions
  end

  # ... narrow filters to useful list
  filter :"state" , :as => :select, :collection => State.all
  filter :name

  # ... create / edit layout
  form do |f|
    f.inputs "Suburb Details" do
      f.input :state,  :as => :select,      :collection => State.all.map { |state| [state.name, state.id] }
      f.input :name
      f.input :post_code,  :as => :select,      :collection => PostCode.all.map { |post| [post.poa_code, post.id] }      
    end

    f.actions
  end

  # ... view detail layout
  show do 
    attributes_table do
      row :state_name do |suburb| suburb.state.name end
      row :name
      row :poa_code do |suburb| suburb.post_code.poa_code end
      row :poa_name do |suburb| suburb.post_code.poa_name end
    end
  end

  # ... sort order customs
  controller do
    def scoped_collection
      end_of_association_chain.includes(:state)
      end_of_association_chain.includes(:post_code)
    end
  end
  
end