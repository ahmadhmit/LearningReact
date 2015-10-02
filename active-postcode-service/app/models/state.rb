class State < ActiveRecord::Base
  devise :database_authenticatable

  # ... validate
  validates :name, :presence => true

  # ... relations
  has_many :suburbs

  def to_s
    name
  end

end
