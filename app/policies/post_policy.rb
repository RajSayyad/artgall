class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.present?
  end

  def update?
    post.user.id == user.id
  end

  def destroy?
    update?
  end

  def my_posts?
    true
  end
end
