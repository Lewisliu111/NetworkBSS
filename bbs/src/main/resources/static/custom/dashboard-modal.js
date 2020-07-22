$(document).ready(function() {

	// 选择帖子的id
	var selectedPostId;

	// 编辑按钮
	$(".editButton").click(function(event){
		// 方法阻止元素发生默认的行为
        event.preventDefault();
        var postId = $(this).data('post-id');
        openPostEditModel(postId);
    })

	// 打开编辑模式
    function openPostEditModel(postId) {
        getJson(postId);
        $("#postEditModal").modal();
    }

    // 获取Post数据来编辑
	function getJson(postId) {
		$.getJSON("../post/" + postId + "/json", function(json){
			fillForm(json);
		});
	}

	// 获取数据后填充表格
	function fillForm(post) {
		$.each(post, function(key, value) {
            
            if (key == "postId" && null != value) {
                $(".modal-body #postId").val(value);
            }
            
            if (key == "postTitle" && null != value) {
                	$(".modal-body #postTitle").val(value);
            }
            
            if (key == "postBody" && null != value) {
                	$(".modal-body #postBody").val(value);
            }
            
            if (key == "categories" && null != value) {
            	   //empty options before filling up new ones
               $("#selectpicker").empty();
               
            	   $.each(value, function(k, category) {
            		   // fill up options
            		   $('#selectpicker').append("<option value='" + category.name + "'>" + category.displayName + "</option>");
            		   
            		   // set up post category
            		   $("#selectpicker").val(post.postCategoryName);
            		   $("#selectpicker").change();
            		               		   
            		   // refresh and render
            		   $('#selectpicker').selectpicker('refresh');
            		   $('#selectpicker').selectpicker('render');
            	   });
            }
        });
	}
	
	// 删除帖子逻辑
	
	$(".deleteButton").click(function(event){
        event.preventDefault();
        var postId = $(this).data('post-id');
        var postTitle = $(this).data('post-title');
        var postUsername = $(this).data('post-username');
        var postDate = $(this).data('post-date');
        $(".modal-body #postId").text("帖子ID: " + postId);
        $(".modal-body #postUsername").text("发帖者：" + postUsername);
        $(".modal-body #postDate").text("发帖日期：" + postDate);
        $(".modal-body #postTitle").text("标题：" + postTitle);
        selectedPostId = postId;
        $("#postDeleteModal").modal();
    })

    $("#confirmDeleteButton").click(function(even){
    		event.preventDefault();
    		if (null != selectedPostId) {
    			deletePost(selectedPostId);
    		}
    })

	// 删除帖子
    function deletePost(postId) {
		$.ajax({
			url: "post/" + postId, 
			type: "DELETE",
			error: function(xhr, status) {
					showMessageModal(false, "删除失败！", "删除帖子（ID：" + postId + "）失败。");
				},
			success: function(result) {
					showMessageModal(true, "删除成功！", "删除帖子（ID：" + postId + "）成功。");
				}
		});
	}

	// 显示消息模态框
	function showMessageModal(success, strongText, messageText) {
		if (success) {
			$("#messageModal #messageText").addClass("alert-success");
		} else {
			$("#messageModal #messageText").addClass("alert-danger");
		}
		$("#messageModal #strongText").text(strongText);
		$("#messageModal #messageText").text(messageText);
		$("#messageModal").modal();
	}
	
	// 刷新当前页面
	$(".refreshCurrPage").click(function(event){
		console.log("refreshCurrPage");
		location.reload();
	})

});