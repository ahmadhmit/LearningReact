class PostCode < ActiveRecord::Base
  devise :database_authenticatable

  belongs_to :suburb, foreign_key: "id"
  
  # ... validate
  validates :poa_code, :presence => true
  validates :poa_name, :presence => true

end