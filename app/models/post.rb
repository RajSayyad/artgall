class Post < ApplicationRecord
  belongs_to :user
  before_save :normalize_description
  has_one_attached :image

  validates :title, :description, presence: true
  validates :image, presence: true

  validate :image_size

  private

  def image_size
    if image.attached? && image.byte_size > 5.megabytes
      errors.add(:image, "is too big. Maximum size is 5MB.")
    end
  end
  def normalize_description
    self.description = description.gsub("\r\n", "\n") # Replace \r\n with \n
  end
end
