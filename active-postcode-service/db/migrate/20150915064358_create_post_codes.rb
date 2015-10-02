class CreatePostCodes < ActiveRecord::Migration
  def change
    create_table :post_codes do |t|
      t.string  :poa_code,  limit: 20, null: false
      t.string  :poa_name,  limit: 100, null: false
    end
  end
end
