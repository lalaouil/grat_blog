class StoriesController < ApplicationController

  def index
    @stories = Story.all
  end

  def new
    @story =Story.new
  end

  def create
    Story.create(story_params)
    redirect_to stories_path
  end

  def edit
    @story = Story.find(params[:id])
  end

  def update
    @story = Story.find(params[:id])
    @story.update_attributes(story_params)
    redirect_to stories_path
  end

  def destroy
    @story =Story.find(params[:id])
    @story.destroy
    redirect_to stories_path
  end

  private

  def story_params
    params.require(:story).permit(:title, :description)
  end

end
