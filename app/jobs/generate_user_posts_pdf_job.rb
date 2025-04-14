class GenerateUserPostsPdfJob
  include Sidekiq::Worker

  def perform(user_id)
    user = User.find(user_id)
    posts = user.posts

    combined_pdf = CombinePDF.new

    posts.each do |post|
      html = ApplicationController.render(
        template: "posts/pdf",
        locals: { post: post },
        layout: false
      )
      html = html.encode("UTF-8")
      pdf_file = Grover.new(html, encoding: "UTF-8", margin_top: "100px", margin_bottom: "100px").to_pdf
      combined_pdf << CombinePDF.parse(pdf_file)
    end

    output_path = Rails.root.join("tmp", "user_#{user.id}_posts.pdf")
    combined_pdf.save(output_path)

    user.posts_pdf.purge if user.posts_pdf.attached?
    user.posts_pdf.attach(
      io: File.open(output_path),
      filename: "user_#{user.id}_posts.pdf",
      content_type: "application/pdf"
    )
  end
end
