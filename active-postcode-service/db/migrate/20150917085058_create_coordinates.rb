class CreateCoordinates < ActiveRecord::Migration
  def change
    create_table :coordinates do |t|
	 t.references :polygon, index: true
	      t.string :latitude
	      t.string :longitude
	      t.timestamps null: false
	    end
	    add_foreign_key :coordinates, :polygons
  end
end
