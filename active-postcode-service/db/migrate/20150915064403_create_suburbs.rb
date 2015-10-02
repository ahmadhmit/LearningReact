class CreateSuburbs < ActiveRecord::Migration
  def change
    create_table :suburbs do |t|
      t.references :state, index: true
      t.references :post_code, index: true      
      t.string  :name,  limit: 50, null: false
    end
    add_foreign_key :suburbs, :states
    add_foreign_key :suburbs, :post_codes    
  end
end
