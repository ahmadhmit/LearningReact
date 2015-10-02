ActiveAdmin.register State do

  # ... initialize params
  permit_params :name

  # ... default sort order
  config.sort_order = "id_asc"

  # ... layouting the table
  index do
    selectable_column
    column :name
    actions
  end

  # ... narrow filters to useful list
  filter :name

  # ... create / edit layout
  form do |f|
    f.inputs "State Details" do
      f.input :name
    end
    f.actions
  end

  # ... view detail layout
  show do 
    attributes_table do
      row :name
    end
  end

end