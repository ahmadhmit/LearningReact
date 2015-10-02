class CreatePolygons < ActiveRecord::Migration
  def change
    create_table :polygons do |t|
      t.references :post_code, index: true      
    end
    add_foreign_key :polygons, :post_codes    
  end
end
