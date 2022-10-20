from timeit import repeat
from django.contrib import admin
from django.urls import include, re_path, path
from quitnow import views

urlpatterns = [
	path('admin/', admin.site.urls),
	path('creation/', views.apicreation.as_view(), name = "register"),
	path('login/',views.apilogin.as_view(), name = "login"),
	path('homepage/<int:id>', views.apihomepage.as_view(), name = "homepage"),
	path('profile/<int:id>', views.apiprofile.as_view(), name = "profile"),
	path('createplan/<int:id>', views.createplan.as_view(), name = "create plan"),
	path('viewplan/<int:id>', views.viewplan.as_view(), name = "view plan"),
	path('updateplan/<int:id>/<int:planid>', views.updateplan.as_view(), name = "updateplan"),
	path('editprofile/<int:id>', views.editprofile.as_view(), name = "editprofile"),
	path('community/<int:id>', views.community.as_view(), name = "community"),
]
