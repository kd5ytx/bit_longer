require 'sinatra'
require 'httparty'
require 'pry'

  get '/:url' do
    "#{params[:url]}"
  end

  post '/' do
    response = HTTParty.get(params['url'])

    #is.gd links
    if response.headers["link"] && response.headers["link"].split(';').first.delete!("<").delete!(">").include?('http')
      puts 'headers[link]'
      "#{response.headers["link"].split(';').first.delete!("<").delete!(">")}"
    elsif response.headers["x-pingback"]
      "#{response.headers["x-pingback"]}"
    else
      "#{params['url']}"
    end
  end
