class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string  :name,        limit: 50, null: false      
    end
  end
end
