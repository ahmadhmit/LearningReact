class Suburb < ActiveRecord::Base
  devise :database_authenticatable

  belongs_to :state, foreign_key: "state_id"
  belongs_to :post_code, foreign_key: "post_code_id"

  # ... validate
  validates :state_id, :presence => true
  validates :post_code_id, :presence => true
  validates :name, :presence => true
end