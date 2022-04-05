# frozen_string_literal: true

# app/controllers/order_controller.rb
class OrdersController < ApplicationController
  def download_csv
    csv_file = File.join Rails.root, 'db', 'memory-tech-challenge-data.csv'
    # AddOrderWorker est appellé dans app/workers/add_order_worker
    # perfom_async permet de transmettre les données à Redis
    AddOrderWorker.perform_async(csv_file)
  end
end
