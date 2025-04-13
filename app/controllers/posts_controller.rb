class PostsController < ApplicationController
  def index
    @posts = Post.includes(:user).all
    render json: @posts
  end

  def create
    post = Post.new(post_params)
    if params[:post][:image].present?
      post.image.attach(params[:post][:image])
    end

    if post.save
      render status: :ok, json: { message: "Post created successfully" }
    else
      render status: :unprocessable_entity, json: { errors: post.errors.full_messages }
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :image, :user_id)
  end
end
