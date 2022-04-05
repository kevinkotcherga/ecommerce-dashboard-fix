# frozen_string_literal: true

# app/controllers/search_controller.rb
class SearchController < ApplicationController
  # force_json force la requête pour être au format json
  before_action :force_json, only: :search

  # ransack recherche la valeur country avec la key :q dans Order
  # @orders est envoyé dans views/search/search.json pour être lu
  def search
    @orders = Order.ransack(country_cont: params[:q])
                   .result(distinct: true)
  end

  private

  def force_json
    request.format = :json
  end
end
