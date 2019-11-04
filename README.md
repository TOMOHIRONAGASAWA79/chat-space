## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|passsword|string|null: false|


### Association
- has_many :group_users
- has_many :messages

##　messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|string|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :messages

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
