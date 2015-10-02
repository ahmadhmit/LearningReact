class Polygon < ActiveRecord::Base
  devise :database_authenticatable

  # ... validate
  validates :post_code_id, :presence => true

  # ... relations
  has_many :vertexs
  belongs_to :post_code, foreign_key: "post_code_id"

end
