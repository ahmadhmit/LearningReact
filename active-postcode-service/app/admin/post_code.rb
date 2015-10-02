ActiveAdmin.register PostCode do

  # ... initialize params
  permit_params :poa_code, :poa_name

  # ... default sort order
  config.sort_order = "id_asc"

  # ... layouting the table
  index do
    selectable_column
    column :poa_code
    column :poa_name
    actions
  end

  # ... narrow filters to useful list
  filter :poa_code
  filter :poa_name

  # ... create / edit config
  form do |f|
    f.inputs "Post Code Details" do
      f.input :poa_code
      f.input :poa_name
    end
    f.actions
  end
  
  # ... view detail layout
  show do 
    attributes_table do
      row :poa_code
      row :poa_name
    end
  end
  
end