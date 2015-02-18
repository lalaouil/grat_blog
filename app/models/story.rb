class Story < ActiveRecord::Base

  private
def post_to_facebook
    if story.is_a?(User) && story.oauth_token.present?
        graph = Koala::Facebook::API.new(story.oauth_token)
        graph.put_connections("me", "feed", message: "TODO: #{content}")
    end
end
end
