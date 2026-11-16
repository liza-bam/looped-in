'use strict';
const step=(id,title,note,screen,children=[],action='')=>({id,title,note,...(screen.startsWith('@')?{source:screen.slice(1)}:{route:screen}),children,action});
const wireflows=[
{id:'overview',title:'App overview',summary:'Start at Home and choose a task.',root:step('home','Home','Eight shortcuts lead to the main app tasks.','home',[
 {...step('home-money','Send and request','Choose a contact before entering an amount.','contacts',[],'Send and request'),jump:'money'},
 {...step('home-events','Events','Browse dates, save events, and check in.','events',[],'Events'),jump:'events'},
 {...step('home-rewards','Rewards','Find earned rewards and open a coupon.','rewards',[],'Rewards'),jump:'rewards'},
 {...step('home-places','Places','Browse merchants and save favorites.','places',[],'Places'),jump:'places'},
 {...step('home-books','Bookstore','Manage reading lists or browse the store.','bookstore',[],'Books'),jump:'books'},
 {...step('home-pay','Payments','Review balances or make a purchase.','finances',[],'Make a purchase'),jump:'pay'},
 {...step('home-deposit','Add funds','Choose a funding source and amount.','deposit',[],'Add funds'),jump:'funds'},
 {...step('home-settings','Settings','Manage your profile, security, and preferences.','settings',[],'Settings'),jump:'settings'}
])},
{id:'onboarding',title:'Sign up and school',summary:'Phone number → account details → school → login.',root:step('start','Opening screen','Enter a phone number to begin.','@onboarding-01',[
 step('unknown','New number','A new number offers a sign-up path.','@onboarding-02',[
 step('details','Your information','Enter a name, email, and matching passwords.','@onboarding-03',[
 step('security','Security question','Choose a question and confirm the answer.','@onboarding-04',[
 step('pin','Security PIN','Create and confirm a four-digit PIN.','@onboarding-05',[
 {...step('pin-error','PIN mismatch','A mismatch keeps this step open and shows an error.','@onboarding-05',[],'Different PINs'),fixture:'pin-error'},
 step('choose-school','Choose a school','The selected college controls the whole skin.','@onboarding-06',[
 step('role','Choose a role','Select the relationship to the college.','@onboarding-07',[
 step('student-id','Student ID','Enter the school ID to finish registration.','@onboarding-09',[
 step('login','School login','Sign in using the school-branded screen.','@onboarding-10',[
 step('registered-home','Home','The dashboard opens after login.','home',[],'Log in')
 ],'Finish')
 ],'Continue')
 ],'Continue')
 ],'Matching PINs')
 ],'Continue')
 ],'Continue')
 ],'New User')
 ],'Click to start')
])},
{id:'money',title:'Messages and money',summary:'Contact → message or transfer → confirmation.',root:step('messages','Messages','Open a conversation or choose a contact.','messages',[
 step('contacts','Contact list','Search by name and choose a person.','contacts',[
 step('conversation','Conversation','Write a message, attach a photo, or start a transfer.','chat/Jim%20Carlson',[
 step('money-choice','Send or request','Choose whether to send money or request it.','@messages-14',[
 step('amount','Enter an amount','Enter the transfer amount.','@messages-15',[
 step('money-pin','Confirm with PIN','Enter the prototype PIN before returning to the conversation.','@messages-16',[
 step('money-draft','Review the draft','The amount stays editable until final confirmation.','@messages-27',[
 step('money-confirm','Final confirmation','Review the recipient and amount.','@messages-18',[
 step('money-sent','Sent transfer','The confirmed transfer appears in the conversation.','@messages-19',[],'Confirm')
 ],'Send')
 ],'Done')
 ],'Continue')
 ],'Send Money')
 ],'Money control'),
 step('photo-choice','Attach a photo','Choose the camera or photo library.','@messages-21',[
 step('camera','Camera preview','Capture a photo in the prototype.','@messages-22',[
 step('photo-review','Review photo','Use the photo or take it again.','@messages-23',[
 step('photo-draft','Photo in draft','The photo is attached before sending.','@messages-24',[],'Use photo')
 ],'Take photo')
 ],'Take Photo')
 ],'Photo control')
 ],'Choose contact')
 ],'New message')
])},
{id:'events',title:'Events and check-in',summary:'Browse → filter or save → details → check-in.',root:step('calendar','Events calendar','Select a date or switch to a list.','@events-01',[
 step('event-filters','Event choices','Select categories in the bottom drawer.','@events-02',[
 step('filtered','Filtered events','Chosen categories narrow the visible events.','@events-05',[],'Close drawer')
 ],'Filter'),
 step('event-list','Events list','Scan events and open a detail screen.','@events-08',[
 step('event-detail','Event details','Read the event information and save or check in.','@events-12',[
 step('event-expanded','More information','Expand the event description.','@events-13',[],'More'),
 step('check-in','Checked in','Successful check-in updates the event state.','@events-14',[
 step('event-reward','Event reward','Open the reward earned through the event.','coupon/Orchestra%20hat',[],'View reward')
 ],'Check in')
 ],'Open event')
 ],'List view'),
 step('saved-events','My events','Saved events remain available in a separate tab.','@events-06',[],'Save event')
])},
{id:'rewards',title:'Rewards and coupons',summary:'Reward list → coupon → presentation or map.',root:step('rewards-start','Rewards','Choose school rewards or merchant rewards.','@rewards-01',[
 step('school-rewards','School rewards','Browse the rewards provided by the college.','@rewards-06',[
 step('coupon','Coupon','Review the offer and its validity.','coupon/Yoga%20mat%20from%20Yoga%20Nut',[
 {...step('present','Present coupon','Use the coupon view when showing it to the merchant.','coupon/Yoga%20mat%20from%20Yoga%20Nut',[],'Use coupon'),fixture:'coupon'},
 step('coupon-map','Find the merchant','Show on map opens a search for the named merchant.','coupon/Yoga%20mat%20from%20Yoga%20Nut',[],'Show on map')
 ],'Open reward')
 ],'School rewards'),
 step('merchant-rewards','Merchant rewards','Earned trophies are badges; hearts save favorites.','merchant-rewards',[
 step('merchant-offer','Merchant offer','Open a merchant to review its offers.','@rewards-05',[],'Open merchant')
 ],'Merchant rewards')
])},
{id:'places',title:'Places and favorites',summary:'Directory → merchant → favorite or map.',root:step('places-list','Places','Search the directory and choose a merchant.','places',[
 step('place-detail','Place details','View the larger image, address, and neighborhood map.','merchant/Lacrosse%20USA',[
 step('place-map','Open a map','The map action searches the named business.','merchant/Lacrosse%20USA',[],'Show on map')
 ],'Open image'),
 {...step('place-favorites','Favorites','The heart saves a place; tap it again to remove it.','places',[],'Tap heart'),fixture:'favorites'}
])},
{id:'books',title:'Booklists',summary:'Course or custom list → books → ownership, details, or buy.',root:step('bookstore','Bookstore','Choose booklists, bestsellers, trade-in, or college fashion.','bookstore',[
 step('lists','Booklists','Open a course list or create a custom list.','booklists',[
 step('course-books','Course books','Tap Have It or Need It to change ownership immediately.','@bookstore-12',[
 step('book-metadata','Book details','The chevron expands metadata without changing ownership.','@bookstore-13',[],'Tap chevron'),
 step('book-actions','Row actions','Swipe the row, or tap its title, to reveal ownership and Buy.','@bookstore_03',[
 step('book-retailer','Book retailer','Buy opens a search for that book at the retailer.','book-retailer/Peter%20Holt-Wagon',[],'Buy')
 ],'Swipe row')
 ],'Open course'),
 step('add-list','Add a list','Find a course list or create a named custom list.','@bookstore_05',[
 step('custom-name','Name the list','Enter the custom reading-list name.','@bookstore_09',[
 step('empty-list','Empty custom list','Add books to start filling the list.','@bookstore-16',[
 step('catalog','Search catalog','Search the source catalog and choose a title.','@bookstore-15',[
 step('add-title','Add the book','Confirm the selected title.','@bookstore-17',[
 step('custom-filled','Updated list','The selected book is saved in the custom list.','@bookstore-18',[],'Add Book')
 ],'Select title')
 ],'Add Books')
 ],'Create list')
 ],'Add Custom List')
 ],'Add List')
 ],'Booklists'),
 {...step('books-store','College fashion','Browse collections and photographed products.','fashion',[],'College fashion'),jump:'store'}
])},
{id:'store',title:'Store and checkout',summary:'Collection → product → cart → demo order.',root:step('fashion','College fashion','Choose a collection or browse featured items.','fashion',[
 step('collection','Collection','Each collection opens its own product selection.','store-collection/school',[
 step('product','Product','Choose size and quantity before adding to the cart.','product/baseball-tee',[
 {...step('cart','Cart','Review variants, quantities, and the subtotal.','store-cart',[
 {...step('checkout','Checkout','Choose pickup or delivery and review the total.','store-checkout',[
 {...step('order','Order confirmation','The local demo order clears the cart and updates the balance.','store-order/LI-1002401',[],'Place demo order'),fixture:'order'}
 ],'Continue'),fixture:'checkout'}
 ],'Add to cart'),fixture:'cart'}
 ],'Open product')
 ],'Choose collection')
])},
{id:'pay',title:'Pay and receipts',summary:'Connect → review purchase → confirmation → receipt.',root:step('finances','Your finances','Review balances and recent activity.','finances',[
 step('connect','Connect to pay','Use the phone-number or QR view.','@pay-02',[
 step('qr','QR view','Switch the connection method.','@pay-03',[],'QR code'),
 step('purchase','Review purchase','Review the merchant, tip, and total.','@pay-04',[
 step('purchase-success','Purchase confirmed','A local success message follows the purchase.','@pay-05',[
 step('purchase-receipt','Receipt','Review the completed transaction.','@pay-06',[],'View receipt')
 ],'Confirm purchase')
 ],'Connect')
 ],'Pay'),
 step('receipts','Receipt history','Filter deposits, transactions, and rewards.','receipts',[],'Receipts')
])},
{id:'funds',title:'Add funds',summary:'Source → amount → card details → success.',root:step('funds','Add funds','Choose the funding source and amount.','@depost funds-01',[
 step('funding-source','Choose an account','Select a card or bank-account path.','@depost funds-02',[
 step('funding-amount','Amount selected','Review the current and resulting balance.','@depost funds-03',[
 step('provider','Payment method','Continue through the simulated provider flow.','@depost funds-04',[
 step('card','Card details','Enter the required card fields.','@depost funds-05',[
 step('billing','Billing details','Complete the required billing fields.','@depost funds-06',[
 step('funds-success','Funds added','The local success state confirms the update.','@depost funds-09',[],'Add funds')
 ],'Continue')
 ],'Card')
 ],'Continue')
 ],'Choose source')
 ],'From')
])},
{id:'settings',title:'Settings and profile',summary:'Profile, security, preferences, support, and school.',root:step('settings','Settings','Open the full settings page to manage the account.','settings',[
 step('profile','Profile','Edit account details or change the profile photo.','profile',[
 step('change-school','Change school','One college choice updates the whole school skin.','school',[],'Select school')
 ],'My Profile'),
 step('pin-current','Current PIN','Enter the current PIN before changing it.','@settings-08',[
 step('pin-update','Update PIN','Enter and confirm the new PIN.','@settings-09',[],'Continue')
 ],'My PIN'),
 step('alerts','Alert preferences','Choose how to receive account alerts.','@settings-13',[],'My Alert Preferences'),
 step('support','Support','Open reports, account help, or legal content.','settings/support',[
 step('privacy','Privacy policy','Legal text scrolls beneath one navigation header.','settings/privacy',[],'Privacy Policy')
 ],'Support')
])}
];
