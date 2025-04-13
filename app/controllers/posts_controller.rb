class PostsController < ApplicationController
  def index
    @posts = Post.includes(:user, image_attachment: :blob).all

    render json: @posts.map { |post|
      {
        id: post.id,
        title: post.title,
        content: post.description,
        date: post.updated_at,
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
        date: post.updated_at,
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

  def update
    post = Post.find(params[:id])
    authorize post!
    if post.update!(post_params)
      render status: :ok, json: { message: "Updated Success" }
    else
      render status: :unprocessable_entity, json: { errors: post.errors.full_messages }
    end
  end

  def my_posts
    posts = current_user.posts
    authorize Post, :my_posts?
    render json: posts.map { |post|
      {
        id: post.id,
        title: post.title,
        content: post.description,
        date: post.updated_at,
        user: {
          id: post.user.id,
          name: post.user.username
        },
        image: post.image.attached? ? url_for(post.image) : nil
      }
    }
  end


  private

  def post_params
    params.require(:post).permit(:title, :description, :user_id)  # Image is handled separately in the create method
  end
end
