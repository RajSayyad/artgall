class PdfsController < ApplicationController
  def create
    GenerateUserPostsPdfJob.perform_async(current_user.id)
    render json: { message: "PDF generation started" }, status: :accepted
  end

  def download
    if current_user.posts_pdf.attached?
      send_data current_user.posts_pdf.download,
                filename: "your_posts.pdf",
                type: "application/pdf"
    else
      render json: { error: "PDF not ready yet" }, status: :not_found
    end
  end
end
