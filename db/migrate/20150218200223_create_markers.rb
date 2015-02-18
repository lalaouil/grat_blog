class CreateMarkers < ActiveRecord::Migration
  def change
    create_table :markers do |t|
      t.json :info

      t.timestamps null: false
    end
  end
end
