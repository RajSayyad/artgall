class PostsController < ApplicationController
  def index
    @posts = Post.includes(:user, image_attachment: :blob).all

    render json: @posts.map { |post|
      {
        id: post.id,
        title: post.title,
        content: post.description,
        user: {
          id: post.user.id,
          name: post.user.username
        },
        image: post.image.attached? ? url_for(post.image) : nil
      }
    }
  end

  def show
    post = Post.find(params[:id])
    render json:
      {
        id: post.id,
        title: post.title,
        content: post.description,
        user: {
          id: post.user.id,
          name: post.user.username
        },
        image: post.image.attached? ? url_for(post.image) : nil
      }
  end

  def create
    post = Post.new(post_params)

    if params[:post][:image].present?
      image = params[:post][:image].tempfile # Access the image file as an IO object
      post.image.attach(io: image, filename: params[:post][:image].original_filename, content_type: params[:post][:image].content_type)
    end

    if post.save
      render status: :ok, json: { message: "Post created successfully" }
    else
      render status: :unprocessable_entity, json: { errors: post.errors.full_messages }
    end
  end


  private

  def post_params
    params.require(:post).permit(:title, :description, :user_id)  # Image is handled separately in the create method
  end
end
