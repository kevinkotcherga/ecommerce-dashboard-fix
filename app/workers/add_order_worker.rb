# frozen_string_literal: true

# app/workers/add_order_worker.rb
# AddOrderWorker est la classe appellé dans orders_controller
class AddOrderWorker
  require 'csv'
  include Sidekiq::Worker
  # Cette option s'assure que Sidekiq ne réessaie pas le téléchargement en cas d'échec
  sidekiq_options retry: false

  def perform(csv_file)
    # La méthode foreach de la bibliothèque CSV lit les valeurs dans le fichier
    # headers:true garantit que la première ligne du fichier est traitée comme une ligne d'en-tête
    CSV.foreach(csv_file, headers: true) do |order|
    Order.create(date: order[0], order_id: order[1], customer_id: order[2], country: order[3], product_code: order[4], product_description: order[5], quantity: order[6], unit_price: order[7])
    end
  end
end
