class MarkersController < ApplicationController

  def index
    @markers = Marker.all
    respond_to do |f|
      f.json { render json: @markers}
    end
  end

  def create
    puts "CREATING A MARKER"
    puts params
    info = params[:marker][:info]
    @marker = Marker.create({info: info})
    respond_to do |f|
      f.json { render json: @marker }
    end
  end


end
